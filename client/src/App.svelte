<script>
  import { fetchContracts, fetchUnpaidJobs } from './api.js';

  let contracts;
  let unpaidJobs;

  async function getContracts() {
    contracts = await fetchContracts();
  }

  async function getUnpaidJobs() {
    unpaidJobs = await fetchUnpaidJobs();
  }

  getContracts();

  getUnpaidJobs();
</script>

<h1>Contracts</h1>
{#if contracts}
  <ul>
    {#each contracts as contract}
      <li>{contract.terms} - {contract.status}</li>
    {/each}
  </ul>
{/if}

<h1>UnpaidJobs</h1>
{#if unpaidJobs}
  <ul>
    {#each unpaidJobs as unpaidJob}
      <li>{unpaidJob.ContractId} - {unpaidJob.price}</li>
    {/each}
  </ul>
{/if}

