package handlers;

import com.google.gson.Gson;
import database.LostFoundDatabase;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.HashMap;
import java.util.List;

/**
 * Class for getting the litems associated with a user.
 * @author Daniel Graves
 */
public class UserLitems implements Route {
    // Database connection
    private final LostFoundDatabase database;

    /**
     * Constructor to initialize the handler.
     * @param database the database that the handler will connect to
     */
    public UserLitems(LostFoundDatabase database) {
        this.database = database;
    }

    /**
     * Method that handles the request to get the litems associated with a user
     * @param request the request to the api endpoint, which contains the userID
     * @param response the response from the api endpoint
     * @return the json formatted string of the response
     * @throws Exception if the connection to the endpoint does not succeed
     */
    @Override
    public Object handle(Request request, Response response) throws Exception {
        Gson gson = new Gson();
        HashMap<String, String> dataMap = gson.fromJson(request.body(), HashMap.class);
        String userID = dataMap.get("userID");
        List<List<String>> val = database.getFromTable("litem", "litemID",
                "userID", userID);
        boolean hasLitem = !val.isEmpty();
        return gson.toJson(hasLitem);
    }
}
