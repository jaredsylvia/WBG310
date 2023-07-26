public class PrivateAccessDemo {
    public static void main(String[] args) {
        Fruit apple = new Fruit();
        apple.setName("apple");
        apple.setColor("red");

        System.out.println("Fruit Name: " + apple.getName());
        System.out.println("Fruit Color: " + apple.getColor());

        // Java doesn't allow direct access to private variables and methods outside the class.
        // So, the following lines will result in compilation errors:

        // System.out.println(apple.name);
        // System.out.println(apple.color);
        // System.out.println(apple.toLowerCase("Test"));
        // System.out.println(apple.capitalizeFirstLetter("test"));
    }
}
