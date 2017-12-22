package com.pioneerlabs.handler;

import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.services.dynamodbv2.document.spec.PutItemSpec;
import com.amazonaws.services.dynamodbv2.model.ConditionalCheckFailedException;
import com.pioneerlabs.model.Project;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.pioneerlabs.model.Response;


public class CreateHandler implements RequestHandler<Project, Response> {

    public Response handleRequest(Project project, Context context) {
        AmazonDynamoDBClient dynamoDBClient = new AmazonDynamoDBClient().withRegion(Region.getRegion(Regions.US_EAST_1));
        DynamoDB dynamoDB = new DynamoDB(dynamoDBClient);
        Table table = dynamoDB.getTable(com.pioneerlabs.util.Constants.DB_NAME);

        try {
            PutItemSpec putItemSpec = new PutItemSpec().withItem(com.pioneerlabs.util.DynamoDBHelper.projectToDBItem(project));
            table.putItem(putItemSpec);
        } catch (ConditionalCheckFailedException e) {
            throw new IllegalArgumentException("400 Bad Project");

        }
        return new Response("Rating for charge station created!", project);
    }

}
