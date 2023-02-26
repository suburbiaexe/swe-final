package handlers;

import com.google.gson.Gson;
import database.LostFoundDatabase;
import spark.Request;
import spark.Response;
import spark.Route;
import java.util.HashMap;

/**
 * Class for the handler to add a fitem to the database
 * @author Daniel Graves
 */
public class AddFitem implements Route {

    /**
     * Field to store the database that the handler connects to
     */
    private final LostFoundDatabase database;

    /**
     * Constructor to initialize the handler
     * @param database the database that the handler will connect to
     */
    public AddFitem(LostFoundDatabase database) {
        this.database = database;
    }

    /**
     * Method that handles the post request to add a fitem to the database
     * @param request the request to the api endpoint, which contains information for the fitem to add
     * @param response the response from the api endpoint
     * @return the json formatted string of the response
     * @throws Exception if the connection to the endpoint does not succeed
     */
    @Override
    public Object handle(Request request, Response response) throws Exception {
        Gson gson = new Gson();
        HashMap<String, String> dataMap = gson.fromJson(request.body(), HashMap.class);
        String foundLocationRoom = "";
        String foundLocationFloor = "";
        String currentLocationDescription = "";
        String securityQuestion = "";
        String securityQuestionResponse = "";

        // optional inputs
        if (dataMap.containsKey("foundLocationRoom")) {
            foundLocationRoom = dataMap.get("foundLocationRoom");
        }
        if (dataMap.containsKey("foundLocationFloor")) {
            foundLocationFloor = dataMap.get("foundLocationFloor");
        }
        if (dataMap.containsKey("currentLocationDescription")) {
            currentLocationDescription = dataMap.get("currentLocationDescription");
        }
        if (dataMap.containsKey("securityQuestion")) {
            securityQuestion = dataMap.get("securityQuestion");
        }
        if (dataMap.containsKey("securityQuestionResponse")) {
            securityQuestionResponse = dataMap.get("securityQuestionResponse");
        }
        // Add the fitem and return a message on successful add
        database.addFitem(dataMap.get("foundLocation"), foundLocationRoom, foundLocationFloor,
                dataMap.get("currentLocation"), currentLocationDescription, dataMap.get("itemType"),
                securityQuestion, securityQuestionResponse, dataMap.get("itemDescription"), dataMap.get("userID"),
                dataMap.get("timeFound"));
        return gson.toJson("Successfully added to fitem table of lost and found database!");
    }
}
