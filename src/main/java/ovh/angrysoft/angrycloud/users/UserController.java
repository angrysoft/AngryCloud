package ovh.angrysoft.angrycloud.users;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ovh.angrysoft.angrycloud.RestResponse;


@RestController
@RequestMapping("/api")
class UserController {
    UserDetailsManager userDetailsManager;
    PasswordEncoder passwordEncoder;



    public UserController(UserDetailsManager userDetailsManager, PasswordEncoder passwordEncoder) {
        this.userDetailsManager = userDetailsManager;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/user/login_failed")
    RestResponse<String> loginFailed() {
        return new RestResponse<>(false, "Wrong Password or username", null,
                HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/user/success_logout")
    RestResponse<String> getLogout() {
        return new RestResponse<>("ok");
    }

    @GetMapping("/user/whoami")
    public RestResponse<User> getWhoami(Authentication authentication) {

        var user = (User) authentication.getPrincipal();
        return new RestResponse<>(user);

    }

    @PostMapping("/user/register")
    public RestResponse<String> registerUser(@RequestBody UserDto user) {
        Assert.notNull(user.username(), "Username cannot be empty");
        Assert.notNull(user.password(), "Password cannot be empty");
        Assert.notNull(user.role(), "Role cannot be empty");
        UserDetails userDetails = User.withUsername(user.username()).password(user.password())
                .passwordEncoder(passwordEncoder::encode).roles(user.role()).build();
        userDetailsManager.createUser(userDetails);
        return RestResponse.statusOk();
    }

}
