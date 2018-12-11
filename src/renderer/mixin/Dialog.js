import Electron from 'electron';
const { dialog } = Electron.remote;

export default {
  methods: {
    showMessageDialog(type, msg) {
      const dialogOptions = { icon: 'static/team.png', type: `${type}`, buttons: ['OK'], message: `${msg}` };
      dialog.showMessageBox(dialogOptions);
    },
  },
};
