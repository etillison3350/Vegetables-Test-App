package com.example.test;

import java.security.Principal;
import java.util.Collection;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.test.user.DuplicateUserException;
import com.example.test.user.User;
import com.example.test.user.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin
public class VegetableController {

	private final VegetableRepository vegetablesList;
	private final UserRepository userList;
	private final PasswordEncoder encoder;

	public VegetableController(VegetableRepository vegetableList, UserRepository userList, PasswordEncoder encoder) {
		this.vegetablesList = vegetableList;
		this.userList = userList;
		this.encoder = encoder;
	}

	@RequestMapping("/")
	public String index() {
		return "Hello, World!";
	}

	@RequestMapping("/vegetables")
	public Collection<Vegetable> vegetables() {
		return vegetablesList.findAll();
	}

	@GetMapping("/vegetables/top")
	public Collection<Vegetable> topVegetables(@RequestParam(required = false) Integer n) {
		return vegetablesList.findTop(n == null ? 10000 : n);
	}

	@GetMapping("/vegetables/{id}")
	public Vegetable vegetable(@PathVariable Integer id) {
		return vegetablesList.findById(id).orElseThrow(() -> new VegetableNotFoundException(id));
	}

	@PutMapping("/vegetables/{id}")
	public Vegetable updateVegetable(@RequestBody Vegetable vegetable, @PathVariable Integer id) {
		Optional<Vegetable> v = vegetablesList.findById(id);

		if (v.isPresent()) {
			vegetable.cloneInto(v.get());
			log.info("Updated: " + v.get());
			vegetablesList.save(v.get());
			return v.get();
		} else {
			vegetablesList.save(vegetable);
			vegetable.setId(id);
			log.info("Added: " + vegetable);
			return vegetable;
		}
	}

	@PostMapping("/vegetables")
	public Vegetable addVegetable(@RequestBody Vegetable vegetable) {
		vegetable = vegetablesList.save(vegetable);
		log.info("Added: " + vegetable.toString());
		return vegetable;
	}

	@DeleteMapping("/vegetables/{id}")
	public void deleteVegetable(@PathVariable Integer id) {
		vegetablesList.deleteById(id);
	}

	@RequestMapping("/{a}/{b}")
	public String ab(@PathVariable int a, @PathVariable int b, @RequestParam(required = false, defaultValue = "a") String A, @RequestParam(required = false, defaultValue = "b") String B) {
		return "<p style=\"overflow-wrap: break-word;\">" + IntStream.range(0, a).mapToObj(i -> A).collect(Collectors.joining()) + IntStream.range(0, b).mapToObj(i -> B).collect(Collectors.joining()) + "</p>";
	}

	@GetMapping("/user")
	public Principal user(Principal user) {
		return user;
	}

	@PostMapping("/user")
	public User registerUser(@RequestBody User user) {
		if (userList.findByUsername(user.getUsername()) != null) throw new DuplicateUserException(user.getUsername());

		user.setPermissions("READ");
		user.setPassword(encoder.encode(user.getPassword()));

		return userList.save(user);
	}

	@GetMapping("/checkuser")
	public boolean usernameAvailable(@RequestParam String username) {
		return userList.findByUsername(username) != null;
	}
}
