

export default class Loader {

  static show = function () {
      let htmlString = `
        <div id="main-loading" class='loader'>
          <div class='p-text-center'>
            <div class="cubes p-m-auto">
                <div class="sk-cube sk-cube1"></div>
                <div class="sk-cube sk-cube2"></div>
                <div class="sk-cube sk-cube3"></div>
                <div class="sk-cube sk-cube4"></div>
                <div class="sk-cube sk-cube5"></div>
                <div class="sk-cube sk-cube6"></div>
                <div class="sk-cube sk-cube7"></div>
                <div class="sk-cube sk-cube8"></div>
                <div class="sk-cube sk-cube9"></div>
            </div>
            <br/>
            <label class='text-18 text-white' style="font-weight: 300">Loading ....</label>
          </div>
        </div>
      `;
      document.getElementById("main-section").insertAdjacentHTML('beforeend', htmlString)
  }

  static hide = function () {
      if (document.getElementById("main-loading")) {
          document.getElementById("main-loading").remove();
      }
  }
}