# Yet-Another-Node-API
A study on the configuration of Node APIs. The core will be a HTTP2 REST API with security and deployment best practices in mind.

4/1/19 - TIL not to use import/export in node. Node only natively supports require and module.exports
### Dev Log
Want updates? I update my dev log every time I add to the project. This goes through my thought processes and things to come!
https://somnivertix.gitbook.io/workspace/yet-another-node-api/dev-log

### Other Notes
// params => /:id
// query => /:id?limit=66&orderBy=age
// body => the whole object

query is things that pertains to the query, ie. What you are looking for. Params(headers) are things that pertains to the overall request (authentication, response format, version, etc.) and body is used to submit new or updated information(eg. A new object)