package tablevis;

import repl.REPL;
import repl.REPLCmdMap;
import repl.REPLCommand;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.io.File;
import java.util.*;

/**
 * Class for loading a database.
 * @author Hannah Julius
 */
public class LoadSQLDatabase implements REPLCommand {
  // Field for repl command map
  private final REPLCmdMap cmdMap;
  // Field containing information about the table
  private final Map<String, DatabaseTable> infoForTable = new HashMap<>();
  // SQL database connection
  private Connection conn;

  /**
   * Constructor for LoadSQLDatabase class.
   * @param cmdMap shared REPL command map
   */
  public LoadSQLDatabase(REPLCmdMap cmdMap) {
    this.cmdMap = cmdMap;
  }

  /**
   * Method to load information from a table into a DatabaseTable object.
   * @param table String name of the table to be created
   * @return DatabaseTable object containing information from the table
   */
  private DatabaseTable loadTable(String table) {
    try {
      // create DatabaseTable object
      DatabaseTable dbTable = new DatabaseTable(table);
      // load column names into DatabaseTable object
      List<String> cols = new ArrayList<>();
      // select all the table column headers
      String colSQL = "SELECT name FROM PRAGMA_TABLE_INFO('" + table + "')";
      PreparedStatement colStatement = conn.prepareStatement(colSQL);
      ResultSet colRS = null;
      // if there is a ResultSet as a result of the prepared statement, populate it here
      if (colStatement.execute()) {
        colRS = colStatement.getResultSet();
      }
      // use the ResultSet to add column headers to the DatabaseTable object
      if (colRS != null) {
        while (colRS.next()) {
          String colName = colRS.getString(1);
          cols.add(colName);
          dbTable.addColumn(colName);
        }
        colRS.close();
      }
      colStatement.close();
      // load data into DatabaseTable object
      // select all data within the table
      String dataSQL = "SELECT * FROM " + table;
      PreparedStatement dataStatement = conn.prepareStatement(dataSQL);
      ResultSet dataRS = null;
      // if there is a ResultSet as a result of the prepared statement, populate it here
      if (dataStatement.execute()) {
        dataRS = dataStatement.getResultSet();
      }
      // use the ResultSet to add data to the DatabaseTable object
      if (dataRS != null) {
        while (dataRS.next()) {
          for (int i = 1; i <= cols.size(); i++) {
            dbTable.addData(dataRS.getString(i));
          }
        }
        dataRS.close();
      }
      dataStatement.close();
      return dbTable;
    } catch (SQLException e) {
      System.out.print(REPL.errorOutput(e.getMessage()));
    }
    return null;
  }

  @Override
  public String commandExec(List<String> userInput) {
    try {
      if (userInput.size() != 2) {
        return REPL.errorOutput("Usage: load <path-to-database>");
      } else {
        // get filename and check to make sure it is valid
        String filename = userInput.get(1);
        File file = new File(filename);
        if (!file.exists()) {
          return REPL.errorOutput("Database not found");
        }
        // connect to the database specified by filename
        Class.forName("org.sqlite.JDBC");
        String urlToDB = "jdbc:sqlite:" + filename;
        conn = DriverManager.getConnection(urlToDB);
        // select all the table names from the database
        String sql = "SELECT name FROM sqlite_master WHERE type='table'";
        PreparedStatement tableStatement = conn.prepareStatement(sql);
        ResultSet tableNameRS = null;
        // if there is a ResultSet as a result of the prepared statement, populate it here
        if (tableStatement.execute()) {
          tableNameRS = tableStatement.getResultSet();
        }
        // use the ResultSet to add table names to a list
        List<String> tableNames = new ArrayList<>();
        if (tableNameRS != null) {
          while (tableNameRS.next()) {
            tableNames.add(tableNameRS.getString(1));
          }
          tableNameRS.close();
        }
        // create DatabaseTable objects for each filename within the list using loadTable helper
        DatabaseTable dbTable;
        for (String table : tableNames) {
          dbTable = this.loadTable(table);
          // populate infoForTable hashmap to contain table names mapped to DatabaseTable objects
          infoForTable.put(table, dbTable);
        }
        // set the shared REPL command class field
        this.cmdMap.setInfoForTable(infoForTable);
        tableStatement.close();
        return "Read successfully from " + filename + "\n";
      }
    } catch (SQLException | ClassNotFoundException e) {
      return REPL.errorOutput(e.getMessage());
    }
  }
}