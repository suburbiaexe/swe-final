package handlers;

import com.google.gson.Gson;
import database.LostFoundDatabase;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.HashMap;

/**
 * Class for updating values in the fitem or litem database.
 * @author Daniel Graves
 */
public class UpdateItems implements Route{
    // Database connection
    private final LostFoundDatabase database;

    /**
     * Constructor to initialize the handler.
     * @param database the database that the handler will connect to
     */
    public UpdateItems(LostFoundDatabase database) {
        this.database = database;
    }

    /**
     * Method that handles the post request to update a fitem or litem in the database
     * @param request the request to the api endpoint, which contains information for the update
     * @param response the response from the api endpoint
     * @return the json formatted string of the response
     * @throws Exception if the connection to the endpoint does not succeed
     */
    @Override
    public Object handle(Request request, Response response) throws Exception {
        Gson gson = new Gson();
        HashMap<String, String> dataMap = gson.fromJson(request.body(), HashMap.class);
        database.editItem(dataMap.get("tableName"), dataMap.get("colName"), dataMap.get("valueToChange"),
                Integer.parseInt(dataMap.get("itemID")));
        return "Successfully updated " + dataMap.get("tableName") + " table of lost and found database!\n";
    }
}
