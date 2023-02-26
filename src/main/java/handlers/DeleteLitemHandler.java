package handlers;

import com.google.gson.Gson;
import database.LostFoundDatabase;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.HashMap;

/**
 * Class for the handler to delete a litem from the database
 * @author Daniel Graves
 */
public class DeleteLitemHandler implements Route {

    /**
     * Field to store the database that the handler connects to
     */
    private final LostFoundDatabase database;

    /**
     * Constructor to initialize the handler
     * @param database the database that the handler will connect to
     */
    public DeleteLitemHandler(LostFoundDatabase database) {
        this.database = database;
    }

    /**
     * Method that handles the post request to delete a litem from the database
     * @param request the request to the api endpoint, which contains information for the litem to delete
     * @param response the response from the api endpoint
     * @return the json formatted string of the response
     * @throws Exception if the connection to the endpoint does not succeed
     */
    @Override
    public Object handle(Request request, Response response) throws Exception {
        Gson gson = new Gson();
        HashMap<String, String> dataMap = gson.fromJson(request.body(), HashMap.class);
        database.deleteLitem(dataMap.get("userID"));
        return "Successfully deleted from litem table of lost and found database!\n";
    }
}
