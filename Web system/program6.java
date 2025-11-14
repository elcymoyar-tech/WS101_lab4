import java.util.*;
import java.util.stream.*;

public class program6 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        ArrayList<Product> list = new ArrayList<>();
        list.add(new Product("Laptop", 50.00));
        list.add(new Product("Mouse", 65.00));
        list.add(new Product("Keyboard", 30.10));
        list.add(new Product("Monitor", 80.00));

        System.out.print("Enter price filter: ");
        double limit = sc.nextDouble();

        long count = list.stream()
                .filter(p -> p.price > limit)
                .count();

        System.out.println("Number of expensive products: " + count);
    }
}