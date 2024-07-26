# Notes
 You should npm install in root and under the client seperately (I could add a script for it). Then, you should run `npm run seed` (same thing, beforescript) then `npm run start` will work for client and server.

- I don't like my response contracts, I need a generic contract and serve responses based on this contract, e.g: { success: true, data: [], error: null}
- I can create a generic error&exception handler.
- I can provide lots of unit tests here
- I can use artillery to measure performance and scalability. Since it's sqlite but it could show how I think.
- I can use Joi or related packages to validate my project to have more structural and fail free validation.
- ... lots of things can be added. However in the given time, I could only add these.