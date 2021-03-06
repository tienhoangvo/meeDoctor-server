const base = require('./base');

module.exports = ({
  displayName,
  resetPasswordToken,
}) =>
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
        Forgot your password? Copy and paste the code below along with your new password to the RESET PASSWORD FORM!
      </p>
      <p>
        If you did not perform this request, please ignore this message!
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
                        href="#"
                        >${resetPasswordToken}</a
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
</table>
`,
  });
