module.exports = {
    paths: {
      "/api/users/register": {
        post: {
            tags: ["User"],
          description: "Regist a new user",
          operationId: "registerUser",
          parameters: [],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
          responses: {
            201: {description: "User created successfully"},
            401: {description: "Invalid user or password"},
            409: {description: "User allready loged"},
            500: {description: "Server error"},
          },
        }
      },
      "/api/users/login": {
        post: {
            tags: ["User"],
          description: "Log in session",
          operationId: "loginUser",
          parameters: [],
          requestBody: {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          responses: {
            200: {description: "User loged successfully"},
            401: {description: "Invalid user or password"},
            409: {description: "User allready loged"},
            500: {description: "Server error"},
          },
        },
      },
      "/api/users/remove": {
        delete: {
            tags: ["User"],
          description: "Remove own user",
          operationId: "removeUser",
          parameters: [],
          requestBody: {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          responses: {
            200: {description: "User removed successfully"},
            401: {description: "Invalid user or password"},
            500: {description: "Server error"},
          },
        },
      },
      "/api/users/logout": {
        post: {
            tags: ["User"],
          description: "Log out session",
          operationId: "logoutUser",
          parameters: [],
          requestBody: {},
          responses: {
            200: {description: "User loged out successfully"},
            401: {description: "Invalid user or password"},
            500: {description: "Server error"},
          },
        },
      },
      "/api/dashb": {
        get: {
            tags: ["Searchs"],
            description: "Shows basic session information",
            operationId: "dashboardUsers",
            parameters: [],
            requestBody: {},
            responses: {
              200: {description: "Successfull request"},
              401: {description: "Missing session token"},
              500: {description: "Server error"},
            },
          },
        post: {
            tags: ["Searchs"],
          description: "Search for a product",
          operationId: "searchProduct",
          parameters: [],
          requestBody: {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/search" },
              },
            },
          },
          responses: {
            201: {description: "Product searched successfully"},
            401: {description: "Missing session token"},
            423: {description: "Max number of searchs reached"},
            429: {description: "Too many request, Anti-DDoS"},
            500: {description: "Server error"},
          },
        },
      },
      "/api/dashb/result": {
        get: {
            tags: ["Searchs"],
            description: "Sort product prices and find cheepers",
            operationId: "compareProducts",
            parameters: [],
            requestBody: {},
            responses: {
              200: {description: "Products sorted successfully"},
              401: {description: "Missing session token"},
              500: {description: "Server error"},
            },
          },
        post: {
            tags: ["Searchs"],
          description: "Mark a product for shopping kart",
          operationId: "markProduct",
          parameters: [],
          requestBody: {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/kart" },
              },
            },
          },
          responses: {
            201: {description: "Product updated successfully"},
            400: {description: "Bad request, needs correct id"},
            401: {description: "Missing session token"},
            500: {description: "Server error"},
          },
        },
      },
      "/api/dashb/list": {
        get: {
            tags: ["Searchs"],
          description: "See all product from shopping kart",
          operationId: "kartProduct",
          parameters: [],
          requestBody: {},
          responses: {
            201: {description: "Product updated successfully"},
            400: {description: "Bad request, needs correct id"},
            401: {description: "Missing session token"},
            500: {description: "Server error"},
          },
        },
        delete: {
            tags: ["Searchs"],
          description: "Delete all products",
          operationId: "deleteProducts",
          parameters: [],
          requestBody: {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/clear" },
              },
            },
          },
          responses: {
            201: {description: "Product updated successfully"},
            400: {description: "Bad request, needs correct id"},
            401: {description: "Missing session token"},
            500: {description: "Server error"},
          },
        },
      },
    },  
  };