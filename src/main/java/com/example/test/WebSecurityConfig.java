package com.example.test;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.test.user.UserService;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	private UserService userService;

	public WebSecurityConfig(UserService userService) {
		this.userService = userService;
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.httpBasic()
		.and().authorizeRequests()
		.antMatchers(HttpMethod.POST, "/user").permitAll()
		.antMatchers(HttpMethod.GET, "/checkuser/**").permitAll()
		.antMatchers(HttpMethod.GET, "/vegetables/**").permitAll()
		.antMatchers(HttpMethod.DELETE, "/vegetables/**").hasAnyAuthority("ADMIN", "DELETE")
		.antMatchers(HttpMethod.POST, "/vegetables/**").hasAnyAuthority("ADMIN", "CREATE")
		.antMatchers(HttpMethod.PUT, "/vegetables/**").hasAnyAuthority("ADMIN", "UPDATE")
		.antMatchers(HttpMethod.GET, "/users/**").hasAuthority("ADMIN")
		.anyRequest().authenticated()
		.and().cors()
		.and().csrf().disable();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(authenticationProvider());
	}

	@Bean
	protected AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		authProvider.setUserDetailsService(userService);
		authProvider.setPasswordEncoder(encoder());
		return authProvider;
	}

	@Bean
	protected PasswordEncoder encoder() {
		return new BCryptPasswordEncoder(12);
	}

}
