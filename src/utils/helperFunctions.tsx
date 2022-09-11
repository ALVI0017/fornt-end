/*
funtion take the formvalue as parameter
convert the formvalue's csv content to a list then check for the format and return the list with flag
*/
export const checkNgetCsv = (test: string) => {
  const productsWithPriceList = test.split("\n");
  console.log(productsWithPriceList, "productsWithPriceList");
  let flag = false;
  const productList: any[] = productsWithPriceList
    .map((product, index) => {
      if (index != 0) {
        const productInfo = product.split(",");
        console.log(productInfo, "productInfo");

        if (productInfo.length !== 2) {
          flag = true;
        }
        if (!parseFloat(productInfo[1])) {
          flag = true;
        }
        const productName = productInfo[0];
        const productPrice = parseFloat(productInfo[1]);
        return {
          key: index.toString(),
          product: productName,
          price: productPrice,
        };
      }
    })
    .filter((item) => item);
  return { productList, flag };
};
