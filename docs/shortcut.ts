// 1
/**
 * @swagger
 * /shortcut:
 *   post:
 *     tags:
 *      - SHORTCUTS API LIST
 *     name: shortcut
 *     summary: To creare a new shortcut
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in : body
 *         name: Request Body
 *         description: Request object for creating a new shortcut
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - passsword
 *             - fname
 *           properties:
 *             link:
 *               type: string
 *             name:
 *                type: string
 *             shortlink:
 *                type: string
 *             userId:
 *                type: string
 *             description:
 *                type: string
 *             tags:
 *                type: array
 *                items:
 *                  type: string
 *             isActive:
 *                type: boolean
 *             accessType:
 *                type: enum
 *                enum:
 *                  - PRIVATE
 *                  - PUBLIC
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
*                  type: string
*       409:
*         description: Shortlink with title already exist!.
*       502:
*         description: Server Error!.
 */

// 2
/**
 * @swagger
 * /shortcut:
 *   get:
 *     tags:
 *      - SHORTCUTS API LIST
 *     name: shortcut
 *     summary: To get all shortcut for a user
 *     consumes:
 *       - application/json
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
*               type: array
*               items: 
*                   properties:
*                       id: 
*                         type: string
*                       name: 
*                         type: string
*                       link: 
*                         type: string
*                       shortlink: 
*                         type: string
*                       description: 
*                         type: string
*                       isActive: 
*                         type: boolean
*                       accessType: 
*                         type: string
*                       createdAt: 
*                         type: string
*                       updatedAt: 
*                         type: string
*                       userId: 
*                         type: string    
*                       tags:
*                         type: string   
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

// 3
/**
 * @swagger
 * /shortcut/${id}:
 *   delete:
 *     tags:
 *      - SHORTCUTS API LIST
 *     name: shortcut
 *     summary: To delete a shortcut by id
 *     parameters:
 *       - name: id
 *         description: id
 *         in: path
 *         type: string
 *         required: true
 *     consumes:
 *       - application/json
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
*               type: array
*               items: 
*                  type: string
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