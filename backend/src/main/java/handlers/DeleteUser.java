package handlers;

import com.google.gson.Gson;
import database.LostFoundDatabase;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.HashMap;

/**
 * Class for the handler to delete a user from the database
 * This handler is currently not utilized by the app
 * @author Daniel Graves
 */
public class DeleteUser implements Route {

    /**
     * Field to store the database that the handler connects to
     */
    private final LostFoundDatabase database;

    /**
     * Constructor to initialize the handler
     * @param database the database that the handler will connect to
     */
    public DeleteUser(LostFoundDatabase database) {
        this.database = database;
    }

    /**
     * Method that handles the post request to delete a user from the database
     * @param request the request to the api endpoint, which contains information for the user to delete
     * @param response the response from the api endpoint
     * @return the json formatted string of the response
     * @throws Exception if the connection to the endpoint does not succeed
     */
    @Override
    public Object handle(Request request, Response response) throws Exception {
        Gson gson = new Gson();
        HashMap<String, String> dataMap = gson.fromJson(request.body(), HashMap.class);
        database.deleteUser(dataMap.get("userID"));
        return "Successfully deleted from users table of lost and found database!\n";
    }
}
