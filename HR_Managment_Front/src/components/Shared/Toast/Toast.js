let timeout = 3000; /** Default timeout */
let position = 'toast-top-center'; /** Default position */
let htmlString = '';
let id = "";
export default class Toast {

  static error = function (props) {
    let message = props.message;
    id = "t-error";
    
    this.checkConfigChange(props);
    htmlString = `
      <div id="${id}" class='${position} toast-container'>
        <div class='custom-toast error-msg'>
          <div role="progressbar" class="error-toast-progress p-progressbar p-component p-progressbar-determinate">
            <div class="p-progressbar-value p-progressbar-value-animate" id="progress-w" style="width: 1%; display: block;">
            </div>
          </div>
          <div class='p-p-3'>
            <div class='p-d-flex p-ai-center'>
              <div class='p-mr-3'>
                <i class='icon-alert-error text-20'></i>
              </div>
              <div class='p-mr-auto'>
                <label>Error!</label><br/>
                <span>${message}</span>
              </div>
              <div>
                <i ${onclick = this.closeToast} class='icon-Cancel text-20 text-dark'></i>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    this.returnToast();
  }

  static info = function (props) {
    let message = props.message;
    id = "t-info";
    this.checkConfigChange(props);
    htmlString = `
      <div id="${id}" class='${position} toast-container'>
        <div class='custom-toast info-msg'>
          <div role="progressbar" class="info-toast-progress p-progressbar p-component p-progressbar-determinate">
            <div class="p-progressbar-value p-progressbar-value-animate" id="progress-w" style="width: 1%; display: block;">
            </div>
          </div>
          <div class='p-p-3'>
            <div class='p-d-flex p-ai-center'>
              <div class='p-mr-3'>
                <i class='icon-alert-info text-20'></i>
              </div>
              <div class='p-mr-auto'>
                <label>Info!</label><br/>
                <span>${message}</span>
              </div>
              <div>
                <i ${onclick = this.closeToast} class='icon-Cancel text-20 text-dark'></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
    this.returnToast();
  }

  static success = function (props) {
    let message = props.message;
    id = "t-success";
    this.checkConfigChange(props);
    htmlString = `
      <div id="${id}" class='${position} toast-container'>
        <div class='custom-toast success-msg'>
          <div role="progressbar" class="success-toast-progress p-progressbar p-component p-progressbar-determinate">
            <div class="p-progressbar-value p-progressbar-value-animate" id="progress-w" style="width: 1%; display: block;">
            </div>
          </div>
          <div class='p-p-3'>
            <div class='p-d-flex p-ai-center'>
              <div class='p-mr-3'>
                <i class='icon-alert-success text-20'></i>
              </div>
              <div class='p-mr-auto'>
                <label>Success!</label><br/>
                <span>${message}</span>
              </div>
              <div>
                <i ${onclick = this.closeToast} class='icon-Cancel text-20 text-dark'></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
    this.returnToast();

  }

  static warning = function (props) {
    let message = props.message;
    id = "t-warning";
    this.checkConfigChange(props);
    htmlString = `
      <div id="${id}" class='${position} toast-container'>
        <div class='custom-toast warning-msg'>
          <div role="progressbar" class="warning-toast-progress p-progressbar p-component p-progressbar-determinate">
            <div class="p-progressbar-value p-progressbar-value-animate" id="progress-w" style="width: 1%; display: block;">
            </div>
          </div>
          <div class='p-p-3'>
            <div class='p-d-flex p-ai-center'>
              <div class='p-mr-3'>
                <i class='icon-alert-warning text-20'></i>
              </div>
              <div class='p-mr-auto'>
                <label>Warning!</label><br/>
                <span>${message}</span>
              </div>
              <div>
                <i ${onclick = this.closeToast} class='icon-Cancel text-20 text-dark'></i>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    this.returnToast();
  }

  static closeToast = function () {
    if (document.getElementById(id)) {
      document.getElementById(id).remove();
    }
  }

  static returnToast = function () {
    document.getElementById("main-section").insertAdjacentHTML('beforeend', htmlString)

    setTimeout(() => {
      this.closeToast();
    }, timeout);
  }

  static checkConfigChange = function (props) {
    if (props.timeout && typeof props.timeout == "number") {
      timeout = props.timeout;
    }

    if (props.position && (props.position == "top-left" || props.position == "toast-top-center")) {
      position = props.position;
    }

    let progressTimeout = timeout;
    setInterval(function () {
      progressTimeout = progressTimeout - 1000;
        if (document.getElementById('progress-w')) {
          let elem = document.getElementById('progress-w');
          elem.style.width = 100 / (progressTimeout / 1000) + "%"
        }
    }, 1000);
  }
}
