export function objFromSnap(snap) {
  if (!snap || !snap.exists) {
    return null;
  }
  return {
    ...snap.data(),
    path: snap.ref.path,
    uid: snap.id
  }
}

export function randomShortCode(size) {
  const random = require('random');
  let code = '';
  let availables = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (let i = 0; i < size; i++) {
    let index = random.int(0, availables.length - 1);
    code += availables[index];
  }

  return code;
}