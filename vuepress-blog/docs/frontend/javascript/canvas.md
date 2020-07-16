## **1.Canvas元素API**

canvas元素并没有提供许多API，实际上它只提供了两个属性与三个方法。如下所示：

- 1.width：canvas元素绘图表面的宽度。在默认情况下，canvas元素自身的尺寸和canvas绘图表面的尺寸是一样的；但是如果你通过style标签内部或者引入外部css文件设置canvasDOM元素的尺寸的话，那么你设置的将只是canvas元素自身的尺寸，canvas绘图表面的尺寸此时保持默认值宽300，高150，浏览器在效果呈现上为了将这两者匹配，会对绘图表面进行放大或者缩放。

- 2.height：canvas元素绘图表面的高度。其他解释同上。

  ```html
  <canvas id="my-house" width="300" height="300"></canvas>
  ```

- 3.getContext()：获取canvas元素的绘图环境对象。

  ```js
  const canvas = document.getElementById('my-house');
  const ctx = canvas.getContext('2d');
  ```

- 4.toDataURL(type, quality)：返回一个数据地址，这个返回的数据地址可以作为页面中img元素的src属性的内容。第一个参数指定图像的数据类型，比如说有image/jpeg或者image/png。默认为image/png。第二个参数指定生成的图像的质量，他必须得是一个介于0~·1.0之间的小数。

  ```js
  var canvas = document.getElementById("canvas");
  var dataURL = canvas.toDataURL("image/jpeg", 1.0);
  console.log(dataURL);
  ```

- 5.toBlob(callBack, type, quality)：这个函数用于创建一个该canvas元素的blob，参数一callback是一个回调函数，成功创建后回调用这个回调函数，并且在调用这个回调函数的时候会对其进行参数，这个参数执行生成的blob。type参数指定blob文件的具体图像类型，默认值是"image/png"。quality参数指定生成的图像的质量，必须是一个介于0~1.0之间的小数。

## **2.Canvas绘图环境API**

canvas元素仅仅是为了充当绘图环境对象的容器而存在的，该绘图环对象环境提供了全部的绘制功能。

- 1.canvas：指向该绘图环境所属的canvas对象。

- 2.fillStyle：指定后续的图形填充操作中所使用的颜色，渐变或者图案。

  ```js
  ctx.fillStyle = "blue";
  ctx.fillRect(10, 10, 100, 100);
  ```

- 3.strokeStyle：指定后续的描边操作中所使用的颜色，渐变色或者图案。

  ```js
  ctx.strokeStyle = "blue";
  ctx.strokeRect(10, 10, 100, 100);
  ```

- 4.font：设定在后续的fillText()和strokeText()操作中所使用的字形。

- 5.lineCap：告诉浏览器如何绘制线段的端点。可取的值有：butt，round，square。默认值是butt。

- 6.lineWidth：决定了在canvas之中绘制线段的屏幕像素宽度。

- 7.lineJoin：告诉浏览器在两条线段相交时如何绘制焦点。可取的值是：bevel，round，miter。默认值是miter。

- 8.textAlign：决定了所画文本的水平对齐方式。

- 9.textBaseline：决定了所画文本的垂直对齐方式。

  ```js
  // Set line width
  ctx.lineWidth = 10; //画笔大小
  // Wall
  ctx.strokeRect(75, 140, 150, 110); // (x, y, width, height) 边线
  // Door
  ctx.fillRect(130, 190, 40, 60); // (x, y, width, height) 填充
  // Roof
  ctx.beginPath();
  ctx.moveTo(50, 140);
  ctx.lineTo(150, 60);
  ctx.lineTo(250, 140);
  ctx.closePath();
  ctx.stroke();
  ```

  