public class Fruit {
    private String name;
    private String color;

    private String toLowerCase(String input) {
        return input.toLowerCase();
    }

    private String capitalizeFirstLetter(String input) {
        return input.substring(0, 1).toUpperCase() + input.substring(1);
    }

    public void setName(String name) {
        this.name = toLowerCase(name);
    }

    public String getName() {
        return capitalizeFirstLetter(name);
    }

    public void setColor(String color) {
        this.color = toLowerCase(color);
    }

    public String getColor() {
        return capitalizeFirstLetter(color);
    }
}
