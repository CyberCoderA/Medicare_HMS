package com.heydrian.medicore.model;

public class JwtUserPayload {
    private String userId;
    private String username;
    private String userFname;
    private String userLname;
    private String userType;

    public JwtUserPayload() {
    }

    public JwtUserPayload(Users user) {
        this.userId = user.getUserId();
        this.username = user.getUsername();
        this.userFname = user.getUserFname();
        this.userLname = user.getUserLname();
        this.userType = user.getUserType();
    }

    public String getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public String getUserFname() {
        return userFname;
    }

    public String getUserLname() {
        return userLname;
    }

    public String getUserType() {
        return userType;
    }

    public Users toUser() {
        Users user = new Users();
        user.setUserId(this.userId);
        user.setUsername(this.username);
        user.setUserFname(this.userFname);
        user.setUserLname(this.userLname);
        user.setUserType(this.userType);
        return user;
    }
}
