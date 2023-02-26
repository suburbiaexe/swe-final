package repl;

import api.PostApi;
import tablevis.DatabaseTable;
import tablevis.LoadSQLDatabase;

import java.util.HashMap;
import java.util.Map;

/**
 * Class for a repl command map.
 */
public class REPLCmdMap {
  // Hashmap storing all repl commands
  private final Map<String, REPLCommand> allCommands;
   // Table vis fields
   private Map<String, DatabaseTable> infoForTable;

  /**
   * Constructor for repl command map.
   */
  public REPLCmdMap() {
    this.allCommands = new HashMap<>();
    PostApi apiPost = new PostApi();
    allCommands.put("apiPost", apiPost);
    LoadSQLDatabase sqlDatabase = new LoadSQLDatabase(this);
    allCommands.put("vis", sqlDatabase);
  }

  /** Retrieves the map of repl commands.
   * @return the allCommands hashmap
   */
  public Map<String, REPLCommand> getCmdMap() {
    return this.allCommands;
  }

  /**
   * Sets the database table shared information
   * @param m takes in a new map to set the info for table to
   */
  public void setInfoForTable(Map<String, DatabaseTable> m) {
    this.infoForTable = new HashMap<>(m);
  }

  /**
   * Gets the info for table hashmap
   * @return Hashmap of string to database table
   */
  public Map<String, DatabaseTable> getInfoForTable() {
    return this.infoForTable;
  }

}