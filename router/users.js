const router = require('express').Router();
require('express-async-errors');
const { getUsers, add } = require('../controller/users');
const { body, param, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ message: errors.array() });
};

router.get(
  '/:email',
  [
    param('email')
      .isEmail()
      .withMessage('이메일 형식을 확인하세요. (example@example.com)'),
    validate,
  ],
  getUsers
);
router.post(
  '/',
  [
    body('name')
      .trim()
      .isLength({ min: 2 })
      .withMessage('이름을 두글자 이상 입력하세요'),
    body('age').isInt().withMessage('나이는 숫자로 입력하세요'),
    body('email')
      .isEmail()
      .withMessage('이메일 형식을 확인하세요(example@example.com)')
      .normalizeEmail(),
    body('job.name').notEmpty().withMessage('회사명을 입력하세요'),
    body('job.title').notEmpty().withMessage('직종을 입력하세요'),
    validate,
  ],
  add
);

module.exports = router;
