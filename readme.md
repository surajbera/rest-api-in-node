```JS
router.route('/').post((createContact))
router.route('/').get(getContacts)
router.route('/:id').get(getContact)
router.route('/:id').put(updateContact)
router.route('/:id').delete(deleteContact)

/* Can be simplified to below */

router.route('/').post((createContact)).get(getContacts)
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact)
```

- A condition can be created for errorHandler middleware:

  - For dev environment, display stack trace
  - For prod environment, do not display stack trace

- Insomnia Constants
  - 400 Bad Request
