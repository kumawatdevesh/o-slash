// 1
/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *      - AUTH API LIST
 *     name: login
 *     summary: To login a user
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in : body
 *         name: Request Body
 *         description: Request object for login api
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - passsword
 *           properties:
 *             email:
 *               type: string
 *             password:
 *                type: string
 *     responses:
*       200:
*         schema:
 *           type: object
*           properties:
*             code:
*               type: number
*             message:
*               type: string
*             success:
*               type: boolean
*             data:
*               type: object
*               properties:
*                 token:
*                   type: string
*       404:
*         description: User with email do not exist!.
*       401:
*         description: Password is incorrect!.
*       502:
*         description: Server Error!.
*         schema:
 *           type: object
*           properties:
*             error:
*               type: string
*             statusCode:
*               type: number
*             path:
*               type: string
*             success:
*               type: boolean
 */

// 2
/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *      - AUTH API LIST
 *     name: login
 *     summary: To register a user
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in : body
 *         name: Request Body
 *         description: Request object for register api
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - passsword
 *             - fname
 *           properties:
 *             email:
 *               type: string
 *             password:
 *                type: string
 *             fname:
 *                type: string
 *             lname:
 *                type: string
 *     responses:
*       201:
*         schema:
 *           type: object
*           properties:
*             code:
*               type: number
*             message:
*               type: string
*             success:
*               type: boolean
*             data:
*               type: array
*               items: 
*                    type: string
*       422:
*         description: Account with email exists!!.
*       502:
*         description: Server Error!.
*         schema:
 *           type: object
*           properties:
*             error:
*               type: string
*             statusCode:
*               type: number
*             path:
*               type: string
*             success:
*               type: boolean
 */