package com.pioneerlabs.model;


import lombok.Data;

import java.util.List;

@Data
public class ListResponse {
    private String message;
    private List<Project> projects;

    public ListResponse(String message, List<Project> projects) {
        this.message = message;
        this.projects = projects;
    }
}