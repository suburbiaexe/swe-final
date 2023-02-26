package edu.brown.cs.student.main;

import com.google.gson.Gson;
import database.LostFoundDatabase;
import handlers.*;
import joptsimple.OptionParser;
import joptsimple.OptionSet;
import repl.REPL;
import repl.REPLCmdMap;
import spark.Request;
import spark.Response;
import spark.Route;
import spark.Spark;
import tablevis.DatabaseTable;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * The Main class of our project. This is where execution begins.
 * @author Daniel Graves and Hannah Julius
 */

public final class Main {

  private static final int DEFAULT_PORT = 3001;

  /**
   * The initial method called when execution begins.
   *
   * @param args An array of command line arguments
   */
  public static void main(String[] args) {
    new Main(args).run();
  }

  private final String[] args;

  /**
   * For tablevis.
   */
  public static REPLCmdMap shareReplData;

  private Main(String[] args) {
    this.args = args;
  }

  private void run() {

    OptionParser parser = new OptionParser();
    parser.accepts("gui");
    parser.accepts("port").withRequiredArg().ofType(Integer.class).defaultsTo(DEFAULT_PORT);

    OptionSet options = parser.parse(args);

    REPL r = new REPL();

    if (options.has("gui")) {
      runSparkServer((int) options.valueOf("port"));
      shareReplData = r.getCommands;
      r.repl();
    } else {
      r.repl();
    }
  }

  private static void runSparkServer(int port) {
    System.out.println("Starting spark server on port " + port);
    Spark.port(port);
    Spark.externalStaticFileLocation("src/main/resources/static");

    Spark.options("/*", (request, response) -> {
      String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
      if (accessControlRequestHeaders != null) {
        response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
      }

      String accessControlRequestMethod = request.headers("Access-Control-Request-Method");

      if (accessControlRequestMethod != null) {
        response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
      }

      return "OK";
    });

    Spark.before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));

    LostFoundDatabase database = new LostFoundDatabase("lost_and_found.sqlite3");
    // Add requests
    Spark.post("/addUser", new AddUserHandler(database));
    Spark.post("/addLitem", new AddLitem(database));
    Spark.post("/addFitem", new AddFitem(database));
    // Delete requests
    Spark.post("/deleteUser", new DeleteUser(database));
    Spark.post("/deleteLitem", new DeleteLitemHandler(database));
    Spark.post("/deleteFitem", new DeleteFitemHandler(database));
    // Update requests - not currently used, but might be for future versions
    Spark.post("/updateUser", new UpdateUsersHandler(database));
    Spark.post("/updateItems", new UpdateItems(database));
    // Info requests
    Spark.post("/userLitems", new UserLitems(database));
    Spark.post("/litemResults", new LitemResults(database));
    // Load data for visualization
    Spark.get("/visualize", new DatabaseHandle());
    Spark.init();
  }

  /**
   * Class for handling loading a database for visualization.
   */
  private static class DatabaseHandle implements Route {
    @Override
    public Object handle(Request req, Response res) {
      try {
        // get shared REPL data for table info, populate list of tables
        Map<String, DatabaseTable> infoForTable = shareReplData.getInfoForTable();
        List<DatabaseTable> tableList = new ArrayList<>();
        for (String tableName : infoForTable.keySet()) {
          tableList.add(infoForTable.get(tableName));
        }
        // return map of data
        Map<String, List<DatabaseTable>> tableMap = Map.of("data", tableList);
        Gson GSON = new Gson();
        return GSON.toJson(tableMap);
      } catch (Exception e) {
        System.out.println(REPL.errorOutput(e.getMessage()));
        return null;
      }
    }
  }

}