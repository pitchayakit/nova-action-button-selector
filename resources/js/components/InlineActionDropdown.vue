<template>
    <div v-if="shouldShowDropdown" class="flex">
         <div
            v-if="actions.length > 0"
            :dusk="`${resource.id.value}-inline-actions`"
            class="flex gap-4 py-1"
        >
            <!-- User Actions -->
            <template v-for="action in actions">
              <button
              as="button"
              v-if="!action.showInDropdown"
              :key="action.uriKey"
              :dusk="`${resource.id.value}-inline-action-${action.uriKey}`"
              @click.stop="() => handleActionClick(action.uriKey)"
              :title="action.name"
              :destructive="action.destructive"
              class="items-center justify-center px-3 text-sm font-bold text-white rounded shadow cursor-pointer bg-primary-500 hover:bg-primary-400 dark:text-gray-900 focus:outline-none focus:ring ring-primary-200 dark:ring-gray-600 h-9"
              >
              {{ action.name }}
              </button>
            </template>
        </div>

        <Dropdown v-if="hasDropdownAction()">
        <span class="sr-only">{{ __('Resource Row Dropdown') }}</span>
        <DropdownTrigger
            :dusk="`${resource.id.value}-control-selector`"
            :show-arrow="false"
        >
            <span class="py-0.5 px-2 rounded">
            <Icon :solid="true" type="dots-horizontal" />
            </span>
        </DropdownTrigger>

        <template #menu>
            <DropdownMenu width="auto" class="px-1">
            <ScrollWrap
                :height="250"
                class="divide-y divide-gray-100 dark:divide-gray-800 divide-solid"
            >
                <div class="py-1" v-if="userHasAnyOptions">
                <!-- Preview Resource Link -->
                <DropdownMenuItem
                    v-if="shouldShowPreviewLink"
                    :data-testid="`${resource.id.value}-preview-button`"
                    :dusk="`${resource.id.value}-preview-button`"
                    as="button"
                    @click.prevent="$emit('show-preview')"
                    :title="__('Preview')"
                >
                    {{ __('Preview') }}
                </DropdownMenuItem>

                <!-- Replicate Resource Link -->
                <DropdownMenuItem
                    v-if="resource.authorizedToReplicate"
                    :dusk="`${resource.id.value}-replicate-button`"
                    :href="
                    $url(
                        `/resources/${resourceName}/${resource.id.value}/replicate`,
                        { viaResource, viaResourceId, viaRelationship }
                    )
                    "
                    :title="__('Replicate')"
                >
                    {{ __('Replicate') }}
                </DropdownMenuItem>

                <!-- Impersonate Resource Button -->
                <DropdownMenuItem
                    as="button"
                    v-if="canBeImpersonated"
                    :dusk="`${resource.id.value}-impersonate-button`"
                    @click.prevent="
                    startImpersonating({
                        resource: resourceName,
                        resourceId: resource.id.value,
                    })
                    "
                    :title="__('Impersonate')"
                >
                    {{ __('Impersonate') }}
                </DropdownMenuItem>
                </div>

                <div
                  v-if="actions.length > 0"
                  :dusk="`${resource.id.value}-inline-actions`"
                  class="py-1"
                >
                  <!-- User Actions -->
                  <template v-for="action in actions">
                  <DropdownMenuItem
                    as="button"
                    v-if="action.showInDropdown"
                    :key="action.uriKey"
                    :dusk="`${resource.id.value}-inline-action-${action.uriKey}`"
                    @click="() => handleActionClick(action.uriKey)"
                    :title="action.name"
                    :destructive="action.destructive"
                  >
                    {{ action.name }}
                  </DropdownMenuItem>
                  </template>
                </div>
            </ScrollWrap>
            </DropdownMenu>
        </template>
        </Dropdown>

        <!-- Action Confirmation Modal -->
        <component
        v-if="confirmActionModalOpened"
        :show="confirmActionModalOpened"
        :is="selectedAction.component"
        :working="working"
        :selected-resources="selectedResources"
        :resource-name="resourceName"
        :action="selectedAction"
        :endpoint="endpoint"
        :errors="errors"
        @confirm="executeAction"
        @close="closeConfirmationModal"
        />

        <!-- Action Response Modal -->
        <component
        v-if="selectedAction"
        :is="actionResponseData.modal"
        @close="closeActionResponseModal"
        :show="showActionResponseModal"
        :data="actionResponseData"
        />
    </div>
</template>

<script>
import { HandlesActions, mapProps } from '@/mixins'
import { mapGetters, mapActions } from 'vuex'

export default {
  mixins: [HandlesActions],

  emits: ['show-preview'],

  props: {
    resource: { type: Object },
    actions: { type: Array },
    viaManyToMany: { type: Boolean },

    ...mapProps([
      'resourceName',
      'viaResource',
      'viaResourceId',
      'viaRelationship',
    ]),
  },

  data: () => ({
    showActionResponseModal: false,
    actionResponseData: {},
  }),

  methods: {
    ...mapActions(['startImpersonating']),

    hasDropdownAction() {
      return this.actions.filter((action) => action.showInDropdown).length > 0;
    }
  },

  computed: {
    ...mapGetters(['currentUser']),

    currentSearch() {
      return ''
    },

    encodedFilters() {
      return ''
    },

    currentTrashed() {
      return ''
    },

    shouldShowDropdown() {
      return this.actions.length > 0 || this.userHasAnyOptions
    },

    shouldShowPreviewLink() {
      return this.resource.authorizedToView && this.resource.previewHasFields
    },

    userHasAnyOptions() {
      return (
        this.resource.authorizedToReplicate ||
        this.shouldShowPreviewLink ||
        this.canBeImpersonated
      )
    },

    canBeImpersonated() {
      return (
        this.currentUser.canImpersonate && this.resource.authorizedToImpersonate
      )
    },

    selectedResources() {
      return [this.resource.id.value]
    },
  },
}
</script>
