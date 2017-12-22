package com.pioneerlabs.model;


import lombok.Data;

@Data
public class Response {
    private String message;
    private Project project;

    public Response(String message, Project project) {
        this.message = message;
        this.project = project;
    }
}
