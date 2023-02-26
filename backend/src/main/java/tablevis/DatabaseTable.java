package tablevis;

import java.util.ArrayList;
import java.util.List;

/**
 * Class representing a Database table.
 * @author Hannah Julius
 */
public class DatabaseTable {
  // field for name of the table
  private final String tableName;
  // field for the columns of the table
  private final List<String> columns = new ArrayList<>();
  // field for the data within the table
  private final List<String> data = new ArrayList<>();

  /**
   * Constructor for DatabaseTable class.
   * @param tableName name of the database table
   */
  public DatabaseTable(String tableName) {
    this.tableName = tableName;
  }

  /**
   * Method to add a column data to the table.
   * @param col String name of the column to be added to the table
   */
  public void addColumn(String col) {
    columns.add(col);
  }

  /**
   * Method to add data to the table.
   * @param datum String representing the data to be added
   */
  public void addData(String datum) {
    data.add(datum);
  }

  /**
   * Method to return table name for testing.
   * @return name of table as a string
   */
  public String getTableName() {
    return this.tableName;
  }

  /**
   * Method to return table columns for testing.
   * @return list of table columns
   */
  public List<String> getColumns() {
    return this.columns;
  }

  /**
   * Method to return table data for testing.
   * @return list of table data
   */
  public List<String> getData() {
    return this.data;
  }

  @Override
  public String toString() {
    return "table name: " + tableName + " cols " + columns + " data " + data;
  }
}
