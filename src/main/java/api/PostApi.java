package api;

import client.ApiClient;
import repl.REPL;
import repl.REPLCommand;
import java.net.http.HttpRequest;
import java.util.List;

/**
 * Class used for testing api requests to the database
 * @author Daniel Graves
 */
public class PostApi implements REPLCommand {

    /**
     * constructor to initiate the command class and create the connection to the command map class
     */
    public PostApi() {
    }

    /**
     * command that sends an api post request to the backend
     * @param userInput with the arguments from the repl, the first being 'apiPost', the second being the handler to use
     *      and the third being the body of the request
     * @return a String of the result of the post request
     */
    @Override
    public String commandExec(List<String> userInput) {
        try {
            if (userInput.size() == 3) {
                // Request to endpoint (base url is always localhost:3001 with different handler endpoints)
                HttpRequest request = ClientRequestGenerator.runPostCommand("http://localhost:3000/" + userInput.get(1),
                        userInput.get(2).substring(1, userInput.get(2).length()-1));
                ApiClient client = new ApiClient();
                String result = client.makeRequest(request);
                return ("successful api connection: result: " + result + "\n");
            } else {
                return REPL.errorOutput("incorrect number of inputs");
            }
        } catch (Exception e) {
            return REPL.errorOutput(e.getMessage());
        }
    }
}
