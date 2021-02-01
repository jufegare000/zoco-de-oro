const { Op } = require("sequelize");
require("dotenv").config();
import Product from "../models/product.model";

export async function getProductListService(param) {
  
  console.log('pram: ' + param);
  if(param === '') {
    return []
  }

  let products = await Product.findAll({
    attributes: ['id', 'nombre', 'marca', 'thumbnail', 'ciudad', 'precio', 'seller', 'rating'],
    where: {
      [Op.or]: [
        {
          nombre: {
            [Op.startsWith]: param
          }
        },
        {
          marca: {
            [Op.startsWith]: param
          }
        }
      ]
    }
  });

  if (products.length === 0) {
    products = await Product.findAll({
      attributes: ['id', 'nombre', 'marca', 'thumbnail', 'ciudad', 'precio', 'seller', 'rating'],
      where: {
        [Op.or]: [
          {
            nombre: {
              [Op.substring]: param
            }
          },
          {
            marca: {
              [Op.substring]: param
            }
          }
        ]
      }
    });
  }
  console.log('Longitud de los productos', products.length)
  console.log('Productos: ', products)
  return products;
}

export const handler = getProductListService;
