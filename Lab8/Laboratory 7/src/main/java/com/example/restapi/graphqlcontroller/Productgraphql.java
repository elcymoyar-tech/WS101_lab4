package com.example.restapi.graphqlcontroller;

import com.example.restapi.NewProduct;
import com.example.restapi.Product;
import com.example.restapi.ProductService;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SubscriptionMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@AllArgsConstructor
public class Productgraphql {

    private final ProductService service;

    @QueryMapping
    public List<Product> allProducts() {
        return service.getAllProducts();
    }

    @QueryMapping
    public Product productById(@Argument Long id) {
        return service.getProductById(id);
    }

    @QueryMapping("findProductsById")
    public List<Product> findProductsById(@Argument int id) {
        Product product = service.getProductById((long) id);
        return product != null ? List.of(product) : List.of();
    }

    @QueryMapping
    public List<String> allNames() {
        return service.getAllProducts().stream()
                .map(Product::getName)
                .toList();
    }

    @MutationMapping
    public Product addProduct(
            @Argument String name,
            @Argument Double price,
            @Argument int quantity
    ) {
        Product product = new Product(null, name, price, quantity);
        return service.addProduct(product);
    }

    @MutationMapping
    public Product addProductUsingInputType(@Argument NewProduct newProduct) {
        Product product = new Product(null, newProduct.getName(), newProduct.getPrice(), newProduct.getQuantity());
        return service.addProduct(product);
    }

    @MutationMapping(name = "updateName")
    public Product updateProductName(
            @Argument Long id,
            @Argument String name
    ) {
        Product existing = service.getProductById(id);
        if (existing == null) return null;
        existing.setName(name);
        return service.updateProduct(id, existing);
    }

    @MutationMapping
    public String deleteProduct(@Argument @NonNull Long id) {
        return service.deleteProduct(id) ? "Product removed" : "Failed to remove product";
    }

    @SubscriptionMapping
    public List<Product> reactiveFetch() {
        return service.getAllProducts();
    }
}

