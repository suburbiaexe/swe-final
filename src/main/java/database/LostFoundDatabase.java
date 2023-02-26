package database;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Class for LostFoundDatabase, facilitates connection and editing of database storing information about users
 *  using the Lost and Found site, lost items posted, and found items posted on the site.
 * @author Hannah Julius
 */
public class LostFoundDatabase {
    // Database connection
    private Connection conn;
    // Prepared statement
    private PreparedStatement prep;
    // Global variable to track ids for items
    private int itemID;

    /**
     * Constructor for LostFoundDatabase, creates connection to database
     * @param filename Takes in a filename of the database, specifically used for testing different versions of the
     *                 database
     */
    public LostFoundDatabase(String filename) {
        // Create connection to database
        try {
            Class.forName("org.sqlite.JDBC");
            String urlToDB = "jdbc:sqlite:" + "data/" + filename;
            conn = DriverManager.getConnection(urlToDB);
            System.out.println("Connected to lost_and_found database\n");
        } catch (SQLException | ClassNotFoundException e) {
            System.out.print(repl.REPL.errorOutput(e.getMessage()));
        }
        // Find the most recently added item to see what the next id to be added to the database
        int maxLitem = 0;
        int maxFitem = 0;
        List<List<String>> lst = getFromTable("fitem", "max(fitemID)", "None", "None");
        if (lst.get(0).get(0) != null) {
            maxFitem = Integer.parseInt(lst.get(0).get(0));
        }
        lst = getFromTable("litem", "max(litemID)", "None", "None");
        if (lst.get(0).get(0) != null) {
            maxLitem = Integer.parseInt(lst.get(0).get(0));
        }
        itemID = Math.max(maxFitem, maxLitem) + 1;
    }

    /**
     * Function to add a found item to the found item database.
     * @param foundLocation Location that the item was found
     * @param foundLocationRoom OPTIONAL: Room that the item was found
     * @param foundLocationFloor OPTIONAL: Floor that the item was found on
     * @param currentLocation The current location of the item
     * @param currentLocationDescription A description of the current location of the item
     * @param itemType The type of the item (corresponds to lfposts.ItemType)
     * @param securityQuestion OPTIONAL: Security question for verification
     * @param securityQuestionResponse OPTIONAL: Answer to the security question
     * @param itemDescription A description of the item
     * @param uid UserID of the user who posted the found item
     * @param dateFound Date the found item was posted
     */
    public void addFitem(String foundLocation, String foundLocationRoom, String foundLocationFloor,
                          String currentLocation, String currentLocationDescription, String itemType,
                         String securityQuestion, String securityQuestionResponse, String itemDescription,
                         String uid, String dateFound) {
        String sql = "INSERT INTO  fitem " +
                "(fitemID,  foundLocation, foundLocationRoom,  foundLocationFloor, currentLocation, " +
                "currentLocationDescription, itemType, securityQuestion, securityQuestionResponse, " +
                "itemDescription, userID, timeFound) " +
                "VALUES ('" + itemID +"', '" + foundLocation +"', '" + foundLocationRoom +"', '" +
                foundLocationFloor +"', '" + currentLocation +"', '" + currentLocationDescription +"', '" +
                itemType +"', '" + securityQuestion +"', '" + securityQuestionResponse +"', '" + itemDescription
                +"', '" + uid +"', '" + dateFound + "')";
        itemID++;
        try {
            prep = conn.prepareStatement(sql);
            prep.executeUpdate();
        } catch (SQLException e) {
            System.out.print(repl.REPL.errorOutput(e.getMessage()));
        }
    }

    /**
     * Function to add an item into the lost item database
     * @param lostLocation Location that the item was lost
     * @param itemType Type of the item (corresponds to lfposts.ItemType)
     * @param itemDescription Description of the lost item
     * @param uid UserID of the user who posted the lost item
     * @param dateLost Date that the lost item was posted
     */
    public void addLitem(String lostLocation, String itemType, String itemDescription, String uid, String dateLost) {
        String sql = "INSERT INTO  litem " +
                "(litemID,  lostLocation, itemType, itemDescription, userID, timeLost) VALUES (" +
                "'" + this.itemID +"', '" + lostLocation +"', '" + itemType  +"', '" + itemDescription
                +"', '" + uid +"', '" + dateLost + "')";
        this.itemID++;
        try {
            prep = conn.prepareStatement(sql);
            prep.executeUpdate();
        } catch (SQLException e) {
            System.out.print(repl.REPL.errorOutput(e.getMessage()));
        }
    }

    /**
     * Function that can be used to insert users into the users table with initial number of litems set to 0.
     * @param username username of the user being added
     * @param email email of the user being added
     * @param userID userID of the user who we are adding to the database
     */
    public void addUser(String username, String email, String userID) {
        String sql = "INSERT INTO  users " +
                "(userID, username, email, numLitems, numFitems) VALUES (" +
                "'" + userID + "', '" + username + "', '" + email + "', " + "' 0 ', ' 0 ')";
        try {
            prep = conn.prepareStatement(sql);
            prep.executeUpdate();
        } catch (SQLException e) {
            System.out.print(repl.REPL.errorOutput(e.getMessage()));
        }
    }

    /**
     * Function to delete a user from the user table using their username.
     * @param uid user ID of user to delete
     */
    public void deleteUser(String uid) {
        String sql = "DELETE FROM users WHERE userID = '" + uid +"'";
        try {
            prep = conn.prepareStatement(sql);
            prep.executeUpdate();
        } catch (SQLException e) {
            System.out.print(repl.REPL.errorOutput(e.getMessage()));
        }
    }

    /**
     * Deletes a litem from the litem database by user ID.
     * @param userID userID of the user whose litem we want to delete
     */
    public void deleteLitem(String userID) {
        String sql = "DELETE FROM litem WHERE userID = '" + userID +"'";
        try {
            prep = conn.prepareStatement(sql);
            prep.executeUpdate();
        } catch (SQLException e) {
            System.out.print(repl.REPL.errorOutput(e.getMessage()));
        }
    }

    /**
     * Deletes a fitem from the fitem database by FitemID.
     * @param fitemID FitemID of item to delete
     */
    public void deleteFitem(int fitemID) {
        String sql = "DELETE FROM fitem WHERE fitemID = '" + fitemID +"'";
        try {
            prep = conn.prepareStatement(sql);
            prep.executeUpdate();
        } catch (SQLException e) {
            System.out.print(repl.REPL.errorOutput(e.getMessage()));
        }
    }

    /**
     * Function to change the number of litems associated with a user. (Other info is fixed in users table)
     * @param username username of user to edit information for
     * @param numLitems the number of litems to increase or decrease current numLitems by
     */
    public void editUser(String username, int numLitems) {
        String sql = "SELECT numLitems FROM users WHERE username = '" + username + "'";
        try {
            prep = conn.prepareStatement(sql);
            ResultSet rs = prep.executeQuery();
            int currNumLitems = 0;
            while (rs.next()) {
                currNumLitems = rs.getInt(1);
            }
            int litemNum = currNumLitems + numLitems;
            sql = "UPDATE users SET numLitems = '" + litemNum +"' WHERE username = '" + username +"'";
            prep = conn.prepareStatement(sql);
            prep.executeUpdate();
        } catch (SQLException e) {
            System.out.print(repl.REPL.errorOutput(e.getMessage()));
        }
    }

    /**
     * Edit attribute of an element in litem or fitem table with litemID or fitemID.
     * @param tableName name of the table to edit information for
     * @param colName the column name of the value being changed
     * @param valueToChange value to set as the value within the column
     * @param itemID the id of the item to change the value for
     */
    public void editItem(String tableName, String colName, String valueToChange, int itemID) {
        String sql;
        if (tableName.equals("litem")) {
            sql = "UPDATE " + tableName + " SET " + colName + "= '" + valueToChange +
                    "' WHERE litemID = '" + itemID +"'";
        } else {
            sql = "UPDATE " + tableName + " SET " + colName + "= '" + valueToChange +
                    "' WHERE fitemID = '" + itemID +"'";
        }
        try {
            prep = conn.prepareStatement(sql);
            prep.executeUpdate();
        } catch (SQLException e) {
            System.out.print(repl.REPL.errorOutput(e.getMessage()));
        }
    }

    /**
     * Function to get specific data from a table with a condition specified.
     * @param tableName table to get information for
     * @param colName the column name of the value to get information for
     * @param conditionColName column name of the value to condition on
     * @param conditionValue value to condition the search on
     * @return String representing the output of executing the query.
     */
    public List<List<String>> getFromTable(String tableName, String colName, String conditionColName, String conditionValue) {
        String sql;
        if (conditionColName.equals("None") && conditionValue.equals("None")) {
            sql = "SELECT " + colName + " FROM " + tableName;
        } else {
            sql = "SELECT " + colName + " FROM " + tableName + " WHERE " + conditionColName + " = '"
                    + conditionValue +"'";
        }
        try {
            prep = conn.prepareStatement(sql);
            ResultSet rs = prep.executeQuery();
            List<List<String>> retVal = new ArrayList<>();
            if (tableName.equals("fitem")) {
                retVal = printFitem(rs, colName);
            } else if (tableName.equals("litem")) {
                retVal = printLitem(rs, colName);
            } else if (tableName.equals("users")) {
                retVal = printUser(rs, colName);
            }
            return retVal;
        } catch (SQLException e) {
            System.out.print(repl.REPL.errorOutput(e.getMessage()));
        }
        return null;
    }

    /**
     * Method to print out the column headers of a table, used for sending information to the frontend.
     * @param tableName the name of the table in the database to print column information for
     * @return a list of strings representing the names of each element for the column
     */
    public List<String> printColumns(String tableName) {
        String colSQL = "SELECT name FROM PRAGMA_TABLE_INFO('" + tableName + "')";
        try {
            prep = conn.prepareStatement(colSQL);
            ResultSet rs = prep.executeQuery();
            List<String> retVal = new ArrayList<>();
            while (rs.next()) {
                retVal.add(rs.getString("name"));
            }
            return retVal;
        } catch (SQLException e) {
            System.out.print(repl.REPL.errorOutput(e.getMessage()));
        }
        return null;
    }

    /**
     * Method to print out SQL query results when querying fitem table.
     * @param output ResultSet output containing output from SQL query
     * @param colName the column we are querying results for
     * @return A list of list of strings string representing the output from the SQL query
     * @throws SQLException thrown if there is an issue with calls to next and getString
     */
    public List<List<String>> printFitem(ResultSet output, String colName) throws SQLException {
        List<List<String>> retVal = new ArrayList<>();
        List<String> innerLst = new ArrayList<>();
        while (output.next()) {
            if (colName.equals("*")) {
                innerLst.add(output.getString("fitemID"));
                innerLst.add(output.getString("foundLocation"));
                innerLst.add(output.getString("foundLocationRoom"));
                innerLst.add(output.getString("foundLocationFloor"));
                innerLst.add(output.getString("currentLocation"));
                innerLst.add(output.getString("currentLocationDescription"));
                innerLst.add(output.getString("itemType"));
                innerLst.add(output.getString("securityQuestion"));
                innerLst.add(output.getString("securityQuestionResponse"));
                innerLst.add(output.getString("itemDescription"));
                innerLst.add(output.getString("userID"));
                innerLst.add(output.getString("timeFound"));
            } else {
                innerLst.add(output.getString(colName));
            }
            retVal.add(innerLst);
            innerLst = new ArrayList<>();
        }
        return retVal;
    }

    /**
     * Method to print out SQL query results when querying litem table.
     * @param output ResultSet output containing output from SQL query
     * @param colName the column we are querying results for
     * @return A list of list of strings string representing the output from the SQL query
     * @throws SQLException thrown if there is an issue with calls to next and getString
     */
    public List<List<String>> printLitem(ResultSet output, String colName) throws SQLException {
        List<List<String>> retVal = new ArrayList<>();
        List<String> innerLst = new ArrayList<>();
        while (output.next()) {
            if (colName.equals("*")) {
                innerLst.add(output.getString("litemID"));
                innerLst.add(output.getString("lostLocation"));
                innerLst.add(output.getString("itemType"));
                innerLst.add(output.getString("itemDescription"));
                innerLst.add(output.getString("userID"));
                innerLst.add(output.getString("timeLost"));
            } else {
                innerLst.add(output.getString(colName));
            }
            retVal.add(innerLst);
            innerLst = new ArrayList<>();
        }
        return retVal;
    }

    /**
     * Method to print out SQL query results when querying user table.
     * @param output ResultSet output containing output from SQL query
     * @param colName the column we are querying results for
     * @return A list of list of strings string representing the output from the SQL query
     * @throws SQLException thrown if there is an issue with calls to next and getString
     */
    public List<List<String>> printUser(ResultSet output, String colName) throws SQLException {
        List<List<String>> retVal = new ArrayList<>();
        List<String> innerLst = new ArrayList<>();
        while (output.next()) {
            if (colName.equals("*")) {
                innerLst.add(output.getString("userID"));
                innerLst.add(output.getString("username"));
                innerLst.add(output.getString("email"));
                innerLst.add(output.getString("numLitems"));
                innerLst.add(output.getString("numFitems"));
            } else {
                innerLst.add(output.getString(colName));
            }
            retVal.add(innerLst);
            innerLst = new ArrayList<>();
        }
        return retVal;
    }
}
