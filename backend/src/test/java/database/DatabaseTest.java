package database;

import org.junit.Test;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.Assert.assertEquals;

public class DatabaseTest {
    @Test
    public void testDB() {
        LostFoundDatabase db = new LostFoundDatabase("lost_and_found_for_testing.sqlite3");
        List<List<String>> output;

        // Test adding
        Date testDate = new Date();
        // user table
        db.addUser("hjulius", "hjulius@mail.com", "7137");
        output = db.getFromTable
                ("users", "email", "username", "hjulius");
        assertEquals("hjulius@mail.com", output.get(0).get(0));
        output = db.getFromTable
                ("users", "numLitems", "email", "hjulius@mail.com");
        assertEquals("0", output.get(0).get(0));
        // litem table
        db.addLitem("Scili", "Waterbottle",
                "green waterbottle", "272", "Today");
        output = db.getFromTable
                ("litem", "itemDescription", "itemType", "Waterbottle");
        assertEquals("green waterbottle", output.get(0).get(0));
        output = db.getFromTable
                ("litem", "lostLocation", "litemID", "1");
        assertEquals("Scili", output.get(0).get(0));
        // fitem table
        db.addFitem("Scili", "", "", "Scili",
                "", "Laptop", "", "",
                "purple", "hello", "Yesterday");
        output = db.getFromTable
                ("fitem", "itemDescription", "fitemID", "2");
        assertEquals("purple", output.get(0).get(0));
        output = db.getFromTable
                ("fitem", "itemType", "currentLocation", "Scili");
        assertEquals("Laptop", output.get(0).get(0));

        // Test updating
        // user table
        db.editUser("hjulius", 2);
        output = db.getFromTable
                ("users", "numLitems", "username", "hjulius");
        assertEquals("2", output.get(0).get(0));

        // litem table
        db.editItem("litem", "itemDescription", "yellow", 1);
        output = db.getFromTable
                ("litem", "itemDescription", "litemID", "1");
        assertEquals("yellow", output.get(0).get(0));

        // fitem table
        db.editItem("fitem", "currentLocation", "the rock", 2);
        output = db.getFromTable
                ("fitem", "currentLocation", "foundLocation", "Scili");
        assertEquals("the rock", output.get(0).get(0));

        // Test deleting
        // user table
        db.deleteUser("7137");
        // litem table
        db.deleteLitem("272");
        // fitem table
        db.deleteFitem(2);
    }
}
