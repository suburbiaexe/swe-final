package repl;

import java.util.List;

/** REPLCommand interface provides interface for generic REPL commands (engineers can
 * create generic command classes from this interface).
 *
 * @author Elizabeth Wu
 */
public interface REPLCommand {
  /** commandExec method executes the given REPL command.
   *
   * @param userInput a List of white-space separated Strings representing the user's REPL
   *                  input
   * @return a String of the method's resulting output
   */
  String commandExec(List<String> userInput);
}
