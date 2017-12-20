# Projects API

This service deals with projects related APIs:

## Get Projects

* **URL**

    `/v1/projects`
    
* **Method**

    `GET`
    
* **URL Params**
    
    `None`

* **Data Params**

    `None`
    
* **Success Response**

    * Code: 200
    * Content: 
    ```
    [
        {
            "id" : 1, 
            "projectName" : "Mars", 
            "groupId" :  "Space", 
            "OrgName" : "Universe"
        },
        {
            "id" : 2,
            "projectName" : "Earth", 
            "groupId" :  "Space", 
            "OrgName" : "Universe"
        },
        {
            "id" : 3,
            "projectName" : "Moon", 
            "groupId" :  "Space", 
            "OrgName" : "Universe"
        }
    ]
    ```
    
* **Error Response**

    * Code: 400 
    
## Get Projects For A Group

Retrieve all projects for a group

* **URL**

    `/v1/projects/groups/{groupId}`
    
* **Method**

    `GET`
    
* **URL Params**
    
    **Required:**
    `groupId=[string]`

* **Data Params**

    `None`
    
* **Success Response**

    * Code: 200
    * Content: 
    ```
    [
        {
            "id" : 1, 
            "projectName" : "Mars", 
            "groupId" :  "Space", 
            "OrgName" : "Universe"
        },
        {
            "id" : 2,
            "projectName" : "Earth", 
            "groupId" :  "Space", 
            "OrgName" : "Universe"
        },
        {
            "id" : 3,
            "projectName" : "Moon", 
            "groupId" :  "Space", 
            "OrgName" : "Universe"
        }
    ]
    ```
    
* **Error Response**

    * Code: 400 
    
    
## Get Project

* **URL**

    `/v1/projects/{id}`
    
* **Method**

    `GET`
    
* **URL Params**
    
    **Required:**
    `id=[integer]`

* **Data Params**

    `None`
    
* **Success Response**

    * Code: 200
    * Contents: 
    ```
    {
       "id" : 1 
       "projectName" : "Mars", 
       "groupId" :  "Space", 
       "OrgName" : "Universe"
    }
    ```
    
* **Error Response**

    * Code: 400 
    
    
## Update Project

* **URL**

    `/v1/projects/{id}`
    
* **Method**

    `PUT`
    
* **URL Params**
    
    **Required:**
    `id=[integer]`

* **Data Params**

    ```
    {
       "id" : 1 
       "projectName" : "Mars", 
       "groupId" :  "Space", 
       "OrgName" : "Universe"
    }
    ```
    
* **Success Response**

    * Code: 201
    
* **Error Response**

    * Code: 400 
    
    
## Delete Project

* **URL**

    `/v1/projects/{id}`
    
* **Method**

    `DELETE`
    
* **URL Params**
    
    **Required:**
    `id=[integer]`

* **Data Params**

    `None`
    
* **Success Response**

    * Code: 204
    
* **Error Response**

    * Code: 400 