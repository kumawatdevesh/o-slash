// 1
/**
 * @swagger
 * /tags:
 *   post:
 *     tags:
 *      - TAGS API LIST
 *     name: shortcut
 *     summary: To creare a new tag
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in : body
 *         name: Request Body
 *         description: Request object for creating a new tag
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - userId
 *           properties:
 *             name:
 *               type: string
 *             userId:
 *                type: string
 *             accessType:
 *                type: enum
 *                enum:
 *                  - PRIVATE
 *                  - PUBLIC
 *             isActive:
 *                type: boolean
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
*       409:
*         description: Tag with title already exist!
*       502:
*         description: Server Error!
 */