package com.fitsera.fitsera_backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.fitsera.fitsera_backend.dto.AddressRequest;
import com.fitsera.fitsera_backend.dto.AddressResponse;
import com.fitsera.fitsera_backend.model.Address;
import com.fitsera.fitsera_backend.model.User;
import com.fitsera.fitsera_backend.repository.AddressRepository;
import com.fitsera.fitsera_backend.repository.UserRepository;

@Service
public class AddressService {
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    public AddressService(AddressRepository addressRepository, UserRepository userRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

    public List<AddressResponse> getUserAddresses(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return addressRepository.findByUser(user).stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public AddressResponse addAddress(Long userId, AddressRequest req) {
        User user = userRepository.findById(userId).orElseThrow();
        Address address = Address.builder()
                .user(user)
                .label(req.getLabel())
                .fullAddress(req.getFullAddress())
                .province(req.getProvince())
                .district(req.getDistrict())
                .ward(req.getWard())
                .phone(req.getPhone())
                .isDefault(req.isDefault())
                .build();
        return mapToResponse(addressRepository.save(address));
    }

    public AddressResponse updateAddress(Long userId, Long addressId, AddressRequest req) {
        Address address = addressRepository.findById(addressId).orElseThrow();
        if (!address.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized to update address");
        }
        address.setLabel(req.getLabel());
        address.setFullAddress(req.getFullAddress());
        address.setProvince(req.getProvince());
        address.setDistrict(req.getDistrict());
        address.setWard(req.getWard());
        address.setPhone(req.getPhone());
        address.setDefault(req.isDefault());

        return mapToResponse(addressRepository.save(address));
    }

    public void deleteAddress(Long userId, Long addressId) {
        Address address = addressRepository.findById(addressId).orElseThrow();
        if (!address.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized to delete address");
        }
        addressRepository.delete(address);
    }

    private AddressResponse mapToResponse(Address a) {
        AddressResponse res = new AddressResponse();
        res.setId(a.getId());
        res.setLabel(a.getLabel());
        res.setFullAddress(a.getFullAddress());
        res.setProvince(a.getProvince());
        res.setDistrict(a.getDistrict());
        res.setWard(a.getWard());
        res.setPhone(a.getPhone());
        res.setDefault(a.isDefault());
        return res;
    }
}