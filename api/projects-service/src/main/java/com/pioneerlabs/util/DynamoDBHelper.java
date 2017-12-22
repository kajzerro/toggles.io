package com.pioneerlabs.util;

import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ScanResult;
import com.pioneerlabs.model.Project;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class DynamoDBHelper {


    public static List<Project> convertResultToProject(ScanResult scan) {
        ArrayList<Project> result = new ArrayList<>();
        for (Map<String, AttributeValue> item : scan.getItems()) {
            Project project = new Project();

            project.setId(item.get(Constants.ID).getS());
            project.setName(item.get(Constants.NAME).getS());
            project.setGroupId(item.get(Constants.GROUP_ID).getS());
            project.setOrgName(item.get(Constants.ORG_NAME).getS());

            result.add(project);
        }
        return result;
    }

    public static Item projectToDBItem(Project project) {
        Item item = new Item();
        item.withString("id", UUID.randomUUID().toString());

        item.withString(Constants.NAME, project.getName());
        item.withString(Constants.GROUP_ID, project.getGroupId());
        item.withString(Constants.ORG_NAME, project.getOrgName());

        return item;
    }
}