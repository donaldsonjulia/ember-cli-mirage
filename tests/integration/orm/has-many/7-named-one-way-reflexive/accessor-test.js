import Helper, { states } from './_helper';
import { module, test } from 'qunit';

module('Integration | ORM | Has Many | Named One-Way Reflexive | accessor', function(hooks) {
  hooks.beforeEach(function() {
    this.helper = new Helper();
  });

  states.forEach((state) => {

    test(`the references of a ${state} are correct`, function(assert) {
      let [ tag, tags ] = this.helper[state]();

      assert.equal(tag.labels.models.length, tags.length, 'the parent has the correct number of children');
      assert.equal(tag.labelIds.length, tags.length, 'the parent has the correct number of children ids');

      tags.forEach((t, i) => {
        assert.deepEqual(tag.labels.models[i], t, 'each child is in parent.children array');

        if (t.isSaved()) {
          assert.ok(tag.labelIds.indexOf(t.id) > -1, 'each saved child id is in parent.childrenIds array');
        }
      });
    });

  });
});