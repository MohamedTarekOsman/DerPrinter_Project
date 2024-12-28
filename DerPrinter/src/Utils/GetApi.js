export async function fetchData(link) {
    const url = `https://api.derprinter.softforte.site/api/v1/${link}`;
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.data; // Assuming the API returns data in the `data` field
    } catch (error) {
      console.error('Error fetching data:', error);
      return []; // Return an empty array in case of error
    }
  }
  
  // Fetch a single product by ID
  export async function fetchSingleProduct(link) {
    const url = `https://api.derprinter.softforte.site/api/v1/${link}`;
  
    try {
      const response = await fetch(url);
  
      // تحقق إذا كانت الاستجابة غير مقبولة
      if (!response.ok) {
        if (response.status === 404) {
          console.warn(`Resource not found: ${url}`); // رسالة تحذيرية عند 404
          return null; // عدم إرجاع أي بيانات
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log()
      return data.data; // افترض أن البيانات موجودة في الحقل `data`
    } catch (error) {
      if (error.message.includes("404")) {
        // إذا كان الخطأ يحتوي على "404"، يتم تسجيل رسالة تحذير فقط
        console.warn(`Resource not found: ${url}`);
      } else {
        console.error('Error fetching single product:', error);
      }
      return null; // عدم إرجاع أي بيانات في حالة وجود خطأ
    }
  }

  export async function fetchHomeOrBlogsData(link) {
    const url = `https://api.derprinter.softforte.site/api/v1/${link}`;
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data; // Assuming the API returns data in the `data` field
    } catch (error) {
      console.error('Error fetching data:', error);
      return []; // Return an empty array in case of error
    }
  }

  export async function fetchSingleBlogProduct(link) {
    const url = `https://api.derprinter.softforte.site/api/v1/${link}`;
  
    try {
      const response = await fetch(url);
  
      // تحقق إذا كانت الاستجابة غير مقبولة
      if (!response.ok) {
        if (response.status === 404) {
          console.warn(`Resource not found: ${url}`); // رسالة تحذيرية عند 404
          return null; // عدم إرجاع أي بيانات
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log()
      return data; // افترض أن البيانات موجودة في الحقل `data`
    } catch (error) {
      if (error.message.includes("404")) {
        // إذا كان الخطأ يحتوي على "404"، يتم تسجيل رسالة تحذير فقط
        console.warn(`Resource not found: ${url}`);
      } else {
        console.error('Error fetching single product:', error);
      }
      return null; // عدم إرجاع أي بيانات في حالة وجود خطأ
    }
  }
  
  