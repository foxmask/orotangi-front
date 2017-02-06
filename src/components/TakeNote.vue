<template>
    <div class="new_note">
        <h3>New note</h3>
        <form method="post" class="form-horizontal" action="">
		<fieldset>
		<legend>Take the note</legend>
		<div class="form-group">
			<label for="id_title" class="col-sm-2 control-label">Title</label>
			<div class="col-sm-6"><input v-model="title"/></div>
		</div>

		<div class="form-group">
			<label for="id_content" class="col-sm-2 control-label">Content</label>
			<div class="col-sm-6"><textarea v-model="content"/></div>
		</div>

		<div class="form-group form-actions">
			<div class="col-sm-offset-2 col-sm-4">
			    <button class="btn btn-primary">Save</button>
            </div>
		</fieldset>
        </form>
    </div>
</template>


<script>
	export default {
        data() {
            return {
                title: '',
                content: ''
            };
        }

	}
</script>
