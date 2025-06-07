import Swal from 'sweetalert2';

export class GameLogger {
  public async log(message: string): Promise<void> {
    await Swal.fire({
      title: "Your Turn",
      timer: 1500,
      timerProgressBar: true,
      theme: 'borderless',
    });
  }
}

export default new GameLogger();
