import React, { Component } from "react";

export default class ConfigForm extends Component {
  constructor() {
    super();
    this.state = {
      edicntl: {}
    };
  }
  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <label for="edicntl-name">Name *</label>
            <input
              name="edicntl-name"
              id="edicntl-name"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label for="edicntl-purpose">Purpose *</label>
            <select
              name="edicntl-purpose"
              id="edicntl-purpose"
              className="form-control"
            >
              <option value="">SELECT</option>
              <option value="ebill">EBIL</option>
              <option value="ebrv">EBRV</option>
            </select>
          </div>
          <div className="form-group">
            <label for="edicntl-usage">Usage *</label>
            <select
              name="edicntl-usage"
              id="edicntl-usage"
              className="form-control"
            >
              <option value="">SELECT</option>
              <option value="T">TEST</option>
              <option value="P">PRODUCTION</option>
            </select>
          </div>
          <div className="form-group">
            <label for="edicntl-descr">Description *</label>
            <textarea rows="4" id="edicntl-descr" className="form-control">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              sodales hendrerit purus. Integer eu mattis magna, sed efficitur
              ipsum. Nulla posuere aliquet eros, ut porta dolor mattis a. Donec
              viverra, diam rhoncus placerat auctor, enim tellus volutpat mi, eu
              mollis purus libero et odio. Donec at ipsum bibendum, pharetra mi
              eget, molestie purus. Aenean mollis libero sit amet metus feugiat,
              nec rutrum turpis semper. Nullam ultrices maximus rutrum. Donec
              vitae urna mauris. Curabitur viverra pellentesque ullamcorper.
              Suspendisse sit amet vulputate ante. Curabitur id vulputate arcu,
              non porttitor nunc. Vivamus aliquet lacus pellentesque, facilisis
              orci eu, venenatis libero. Suspendisse non diam felis. Etiam
              finibus quis nibh in fringilla. Cras in est laoreet, cursus leo
              quis, iaculis erat.
            </textarea>
          </div>
          <button type="button">Save</button>
        </form>
      </div>
    );
  }
}
