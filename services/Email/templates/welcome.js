const {
  CLIENT_DOMAIN,
} = require('../../../env/');
const base = require('./base');

module.exports = ({ displayName, roomName }) =>
  base({
    content: `
<table
  role="presentation"
  border="0"
  cellpadding="0"
  cellspacing="0"
>
  <tr>
    <td>
      <p>Hi ${displayName},</p>
      <p>
        Welcom to meeDoctor, we're glad to have you 🎉🎊
      </p>
      <p>
        So now you just take a look at your room and start your private telemdicine practice here!
      </p>
      <table
        role="presentation"
        border="0"
        cellpadding="0"
        cellspacing="0"
        class="btn btn-primary"
      >
        <tbody>
          <tr>
            <td align="left">
              <table
                role="presentation"
                border="0"
                cellpadding="0"
                cellspacing="0"
              >
                <tbody>
                  <tr>
                    <td>
                      <a
                        href="${CLIENT_DOMAIN}/${roomName}"
                        target="_blank"
                        >Start practice!</a
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Don't hesitate to contact with us whenever you have any questions for our services
      </p>
      <p>Good luck! Hope it works</p>
      <p>Tien Vo, 2021</p>
    </td>
  </tr>
</table>`,
  });
