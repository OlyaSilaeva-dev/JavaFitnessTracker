package com.example.JavaFitnessTracker.services;

import com.example.JavaFitnessTracker.entity.Image;
import com.example.JavaFitnessTracker.entity.User;
import com.example.JavaFitnessTracker.repositories.ImageRepository;
import com.example.JavaFitnessTracker.repositories.UserRepository;
import com.example.JavaFitnessTracker.exceptions.UnknownUserException;
import jakarta.transaction.Transactional;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@Getter
@RequiredArgsConstructor
public class UserService {

    private final Log logger = LogFactory.getLog(this.getClass());

    private final UserRepository userRepository;

    private final ImageRepository imageRepository;

    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Transactional
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    public void save(User user, MultipartFile file) throws IOException {
        Image image;
        if (file.getSize() != 0) {
            image = toImageEntity(file);
            imageRepository.save(image);
            user.setAvatar(image);
        }
        userRepository.save(user);
    }

    private Image toImageEntity(MultipartFile file) throws IOException {
        Image image = new Image();
        image.setName(file.getOriginalFilename());
        image.setOriginalFilename(file.getOriginalFilename());
        image.setContentType(file.getContentType());
        image.setSize(file.getSize());
        image.setBytes(file.getBytes());
        return image;
    }

    public void update(User user, MultipartFile file) throws IOException {
        Image image;
        if (file.getSize() != 0) {
            image = toImageEntity(file);
            imageRepository.save(image);
            user.setAvatar(image);
        }
        userRepository.save(user);
    }

    public boolean makeAdmin(Long id) {
        return makeAdmin(userRepository.findById(id).orElseThrow(UnknownUserException::new));
    }

    private boolean makeAdmin(User user) {
        if (user.getRole().toString().equalsIgnoreCase("ADMIN")) {
            logger.warn("Unknown error: " + user.getRole().toString() + " not equals to 'user'");
            return false;
        }
        else {
            userRepository.changeToAdmin(user.getId());
            return true;
        }
    }

    public boolean makeUser(Long id) {
        return makeUser(userRepository.findById(id).orElseThrow(UnknownUserException::new));
    }

    public boolean makeUser(User user) {
        if (user.getRole().toString().equalsIgnoreCase("USER")) {
            logger.warn("Unknown error: " + user.getRole().toString() + " not equals to 'user'");
            return false;
        }
        else {
            userRepository.changeToUser(user.getId());
            return true;
        }
    }
}
