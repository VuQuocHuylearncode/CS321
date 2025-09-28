package com.fitsera.fitsera_backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fitsera.fitsera_backend.dto.OrderItemResponse;
import com.fitsera.fitsera_backend.dto.OrderResponse;
import com.fitsera.fitsera_backend.model.Listing;
import com.fitsera.fitsera_backend.model.Order;
import com.fitsera.fitsera_backend.model.User;
import com.fitsera.fitsera_backend.repository.ListingRepository;
import com.fitsera.fitsera_backend.repository.OrderRepository;
import com.fitsera.fitsera_backend.repository.UserRepository;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ListingRepository listingRepository;

    public OrderService(OrderRepository orderRepository, UserRepository userRepository, ListingRepository listingRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.listingRepository = listingRepository;
    }

    @Transactional
    public OrderResponse createOrder(Long userId, Order order) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        order.setUser(user);
        order.setStatus(order.getStatus() != null ? order.getStatus() : "PENDING");

        order.getItems().forEach(item -> {
            item.setOrder(order);

            Listing listing = listingRepository.findById(item.getListing().getId())
                    .orElseThrow(() -> new RuntimeException("Listing not found"));
            item.setListing(listing);

            item.setPrice(item.getDays() * listing.getPricePerDay());
        });

        Order savedOrder = orderRepository.save(order);
        return mapToResponse(savedOrder);
    }

    public List<OrderResponse> getOrdersByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return orderRepository.findByUser(user)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private OrderResponse mapToResponse(Order order) {
        OrderResponse response = new OrderResponse();
        response.setId(order.getId());
        response.setStatus(order.getStatus());

        List<OrderItemResponse> itemResponses = order.getItems()
                .stream()
                .map(item -> {
                    OrderItemResponse i = new OrderItemResponse();
                    i.setId(item.getId());
                    i.setDays(item.getDays());
                    i.setPrice(item.getPrice());
                    return i;
                })
                .collect(Collectors.toList());

        response.setItems(itemResponses);
        return response;
    }

    public OrderResponse getOrderDetail(Long userId, Long orderId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized to view this order");
        }

        return mapToResponse(order);
    }

    public OrderResponse updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(status);
        Order saved = orderRepository.save(order);

        return mapToResponse(saved);
    }

    public void deleteOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!"PENDING".equals(order.getStatus())) {
            throw new RuntimeException("Only PENDING orders can be deleted");
        }

        orderRepository.delete(order);
    }
}