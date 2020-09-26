class Http {
  static instance = new Http();

  get = async (url) => {
    try {
      let req = await fetch(url);

      let json = await req.json();

      return json;
    } catch (e) {
      console.error('http get method e', e);

      throw Error(e);
    }
  };

  post = async (url, data) => {
    try {
      let req = await fetch(url, {
        method: 'POST',
        data,
      });

      let json = await req.json();

      return json;
    } catch (e) {
      console.error('http method post error', e);

      throw Error(e);
    }
  };

  post = async (url, id, data) => {
    try {
      let req = await fetch(`${url}` / `${id}`, {
        method: 'PUT',
        data,
      });

      let json = await req.json();

      return json;
    } catch (e) {
      console.error('http method put error', e);

      throw Error(e);
    }
  };

  delete = async (url, id) => {
    try {
      let req = await fetch(`${url}` / `${id}`, {
        method: 'DELETE',
      });

      let json = await req.json();

      return json;
    } catch (e) {
      console.error('http method delete error', e);

      throw Error(e);
    }
  };
}

export default Http;
